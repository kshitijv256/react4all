import { useEffect, useState } from "react";
import { Submission } from "../../types/data";
import { getField } from "../../utils/apiUtils";

type DisplayAnswer = {
  form_field: number;
  label: string;
  value: string;
};

const prepareAnswers = async (
  submission: Submission,
  form_pk: number,
  setAnswersCB: (value: DisplayAnswer[]) => void
) => {
  const answersList = submission.answers.map(async (answer) => {
    const field = await getField(form_pk, answer.form_field);
    return {
      form_field: answer.form_field,
      label: field.label,
      value: answer.value,
    };
  });
  setAnswersCB(await Promise.all(answersList));
};

export default function Answer(props: {
  submission: Submission;
  form_pk: number;
}) {
  const [answers, setAnswers] = useState<DisplayAnswer[]>([]);

  useEffect(() => {
    prepareAnswers(props.submission, props.form_pk, setAnswers);
  }, [props.submission, props.form_pk]);

  return (
    <div className="flex flex-col gap-2 py-3 px-2">
      {answers.map((answer) => (
        <div key={answer.form_field} className="flex items-center">
          <div>
            <div className="font-medium text-gray-900 capitalize">
              {answer.label}
            </div>
          </div>
          <div className="ml-4">
            <div className="font-medium text-cyan-600">{answer.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
