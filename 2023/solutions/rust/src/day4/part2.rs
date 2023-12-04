use color_eyre::eyre::{ContextCompat, Result};
use color_eyre::Help;
use std::collections::HashSet;
use std::fs::File;
use std::io::{BufRead, BufReader, Seek, SeekFrom};

pub struct Scratchcards {
    quantity: usize,
    matches: Vec<usize>,
}

impl Scratchcards {
    pub fn new(filename: &str) -> Result<Self> {
        let mut file = File::open(filename)?;

        let quantity = BufReader::new(&file).lines().count();
        let mut matches = vec![0; quantity];

        file.seek(SeekFrom::Start(0))?;
        for (index, input) in BufReader::new(&file).lines().enumerate() {
            let line = input?;

            let (_titles, cards) = line
                .split_once(":")
                .wrap_err("Couldn't split the lines")
                .suggestion("Make sure every line contains a colon (:)")?;

            let (winners, guesses) = cards
                .split_once("|")
                .wrap_err("Couldn't split the scratchcards")
                .suggestion("Make sure every line contains a vertical bar (|)")?;

            let winner_hashset: HashSet<&str> = HashSet::from_iter(winners.split_whitespace());
            let guesses_hashset: HashSet<&str> = HashSet::from_iter(guesses.split_whitespace());

            matches[index] = winner_hashset.intersection(&guesses_hashset).count()
        }

        Ok(Self { quantity, matches })
    }
    pub fn solve(&self) -> Result<usize> {
        let mut stack = Vec::from_iter(0..self.quantity);
        let mut counter = self.quantity;

        while !stack.is_empty() {
            // Unwrap is fine here, as this code won't be reached, if the stack is empty.
            let element = stack.pop().unwrap();
            let match_count = self.matches[element];

            for i in 0..match_count {
                stack.push(element + i + 1)
            }

            counter += match_count;
        }

        Ok(counter)
    }
}
