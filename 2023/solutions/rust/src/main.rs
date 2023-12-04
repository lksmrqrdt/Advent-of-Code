use crate::day4::part2::Scratchcards;
use color_eyre::eyre::Result;

mod day4;

fn main() -> Result<()> {
    color_eyre::install()?;

    let scratchcards = Scratchcards::new("../../inputs/day-4.txt")?;
    let result = scratchcards.solve()?;

    println!("{}", result);
    Ok(())
}
