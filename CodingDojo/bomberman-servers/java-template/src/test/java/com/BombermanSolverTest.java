package com;

import com.utils.Board;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class BombermanSolverTest {

    private final DirectionSolver solver = new DirectionSolver();

    private void assertB(String board, Direction direction) {
        assertEquals(direction, solver.get(new Board(board)));
    }

    @Test
    public void should_when() {
        assertB("☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼" +
                "☼☺        # # ☼" +
                "☼ ☼ ☼ ☼#☼ ☼ ☼ ☼" +
                "☼##           ☼" +
                "☼ ☼ ☼#☼ ☼ ☼ ☼ ☼" +
                "☼   #    # #  ☼" +
                "☼ ☼ ☼ ☼#☼ ☼ ☼ ☼" +
                "☼             ☼" +
                "☼#☼ ☼ ☼#☼ ☼ ☼#☼" +
                "☼  #  #       ☼" +
                "☼ ☼ ☼ ☼ ☼ ☼ ☼#☼" +
                "☼ ##      #   ☼" +
                "☼ ☼ ☼ ☼ ☼ ☼ ☼#☼" +
                "☼ #   #  &    ☼" +
                "☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼",
                Direction.ACT);
    }

}
