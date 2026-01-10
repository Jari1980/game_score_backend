package SportScore.Sport.domain.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record CreateMatchRequestDTO(
        LocalDate matchDate,
        String homeTeam,
        String awayTeam,
        int homeTeamScore,
        int awayTeamScore
) { }
