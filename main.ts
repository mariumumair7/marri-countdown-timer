#! /usr/bin/env node


import inquirer from 'inquirer';

// Function to format time in MM:SS
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Countdown timer function
const countdown = (duration: number) => {
  const timer = setInterval(() => {
    console.log(formatTime(duration));
    duration -= 1;
    if (duration < 0) {
      clearInterval(timer);
      console.log('Time\'s up!');
    }
  }, 1000);
};

// Inquirer prompt for timer duration
const promptDuration = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'duration',
      message: 'Enter countdown duration in seconds:',
      validate: (input: string) => {
        const parsed = parseInt(input, 10);
        return !isNaN(parsed) && parsed > 0 ? true : 'Please enter a positive number.';
      },
    },
  ]);

  const duration = parseInt(answers.duration, 10);
  countdown(duration);
};

// Run the prompt
promptDuration();
