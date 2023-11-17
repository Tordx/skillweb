import React from 'react';

type Props = {
  skills: string[];
  requirements: string[];
  title: string;
};

export default function MatchedCompetencies({ skills, requirements, title }: Props) {
  const calculateMatches = () => {
    const matchedCount: { [key: string]: number } = {};

    skills.forEach(skill => {
      const count = requirements.filter(req => req.toLowerCase() === skill.toLowerCase()).length;
      matchedCount[skill] = count;
    });

    // Sort the matchedCount object in descending order
    const sortedMatches = Object.entries(matchedCount)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10); // Limit to 10 results

    return Object.fromEntries(sortedMatches);
  };

  const matchedCount = calculateMatches();

  return (
      <div className='data-container skills-wrapper'>
        <div className='progress-wrapper'>
          <h4 className='progress-wrapper-header stat-header'>{title}</h4>
          <div className='progress-table'>
            {Object.entries(matchedCount).map(([skill, count]) => (
              <div key={skill} className='progress-row'>
                <div className='progress-cell skills-text'>
                  <span>{skill}</span>
                </div>
                <div className='progress-percent skills-text'>
                  <span>{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
