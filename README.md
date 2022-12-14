# Rope Visualization
## Advent of Code 2022 Day 09: Rope Bridge

The question on [AOC Day 09](https://adventofcode.com/2022/day/9) lend's itself to [a great visualization](https://hemephelus.github.io/Rope-Visualization-AOC-2022-day-09/). The main goal of the question is to determine how many uniques points the tail of the rope has been to.

In the first part of the question, head of the rope and the tail occupy 2 points on the grid. the 2 end have to touch each other. they are touching if and only if the head is only 1 step away from the tail either horizontally, vertically, or diagonally.

In the second part of the question, nothing much changes apart from the length of the rope, which is now 10. the same rules still apply, just on a longer rope.

## The visualization
For the visualization, I made a p5js canvas that renders how the rope will move and how the point behind it would react.

I also made each point a little darker than the one before it, so you can see the each segment of the rope. 

In addition, i added a history track. this shows you all the points each segment of the rope has been to.

In other not to lose track of the main rope, I made the main rope a little bigger that the history points, and I made the canvas follow the main rope so it is never off the screen.

The red point represent the starting pint.

I hope this is helpful, enjoy the visualization.