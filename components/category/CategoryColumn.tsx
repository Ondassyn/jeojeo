'use client';

import { Category, Question, Session } from '@prisma/client';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';
import { Player } from '@/types';
import QuestionCard from '../question/QuestionCard';
import CategoryName from './CategoryName';

const CategoryColumn = ({
  category,
  session,
  players,
  setPlayers,
}: {
  category: Category;
  session?: Session;
  players?: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  useEffect(() => {
    setLoadingQuestions(true);
    fetch(`/api/questions/?categoryId=${category?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => {
        toast.error('Something went wrong!');
      })
      .finally(() => setLoadingQuestions(false));
  }, [category]);

  return (
    <div className="flex flex-col w-72 h-full gap-4">
      <div className="flex flex-row items-center text-white">
        <CategoryName
          categoryName={category?.name}
          categoryId={category?.id}
        />
      </div>
      {questions.map((question) => (
        <QuestionCard
          key={question?.id}
          question={question}
          categoryId={category?.id}
          session={session}
          players={players}
          setPlayers={setPlayers}
        />
      ))}
    </div>
  );
};

export default CategoryColumn;
