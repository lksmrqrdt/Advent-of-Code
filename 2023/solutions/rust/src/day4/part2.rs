use color_eyre::eyre::{ContextCompat, Result};
use color_eyre::Help;
use std::collections::HashSet;
use std::fs::File;
use std::io::{BufRead, BufReader};

pub struct Scratchcards {
    counts: Vec<usize>,
    matches: Vec<usize>,
}

impl Scratchcards {
    pub fn new(filename: &str) -> Result<Self> {
        let file = File::open(filename)?;
        let reader = BufReader::new(file).lines();

        let mut matches = Vec::new();
        let mut counts = Vec::new();

        for text in reader {
            let line = text?;

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

            matches.push(winner_hashset.intersection(&guesses_hashset).count());
            counts.push(1);
        }

        Ok(Self { counts, matches })
    }
    pub fn solve(&mut self) -> Result<usize> {
        let mut counter = 0;

        for i in 0..self.counts.len() {
            let card_count = self.counts[i];
            counter += card_count;

            let match_count = self.matches[i];

            for j in 0..match_count {
                // This will not overflow, as the input is strictly made to not cause a failure here.
                self.counts[i + j + 1] += card_count;
            }
        }

        Ok(counter)
    }
}
