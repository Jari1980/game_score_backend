package SportScore.Sport.domain.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record MatchSummaryDTO(
        Long matchId,
        LocalDate matchDate,
        String homeTeam,
        String awayTeam,
        String score,
        String winningTeam
) { }
