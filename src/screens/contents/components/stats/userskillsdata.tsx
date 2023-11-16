import React from 'react';

type Props = {
  data: string[];
  title: string;
};

export default function UserSkillsData({ data, title }: Props) {
  const countOccurrences = (arr: string[]) => {
    const counts: { [key: string]: number } = {};

    arr.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });

    return counts;
  };

  const wordCounts = countOccurrences(data);

  const getTop10 = (counts: { [key: string]: number }) => {
    const sortedWords = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    const top10Words = sortedWords.slice(0, 10);
    return top10Words;
  };

  const top10Words = getTop10(wordCounts);

  return (
    <div className='data-container skills-wrapper'>
      <div className='progress-wrapper'>
        <span className='progress-wrapper-header stat-header'>{title}</span>
        <div className='progress-table'>
          {top10Words.map((word) => (
            <div key={word} className='progress-row'>
              <div className='progress-cell skills-text'>
                <span>{word}</span>
              </div>
              <div className='progress-percent skills-text'>
                <span>{wordCounts[word]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
