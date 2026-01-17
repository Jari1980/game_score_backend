package SportScore.Sport.domain.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record MatchResponseDTO(
    Long matchId,
    LocalDate matchDate,
    String homeTeam,
    String awayTeam,
    int homeTeamScore,
    int awayTeamScore,
    String winningTeam
) { }
