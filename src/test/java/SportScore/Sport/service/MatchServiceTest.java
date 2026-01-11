package SportScore.Sport.service;

import SportScore.Sport.domain.dto.CreateMatchRequestDTO;
import SportScore.Sport.domain.dto.MatchResponseDTO;
import SportScore.Sport.domain.entity.Match;
import SportScore.Sport.repository.MatchRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.engine.DiscoveryIssue;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.List;


@ExtendWith(MockitoExtension.class)
public class MatchServiceTest {

    @Mock
    private MatchRepository matchRepository;

    @InjectMocks
    private MatchService matchService;

    @Test
    void submitMatchScore_homeTeamWins() {
        CreateMatchRequestDTO request = CreateMatchRequestDTO.builder()
                .matchDate(LocalDate.of(2025,1,1))
                .homeTeam("Team A")
                .awayTeam("Team B")
                .homeTeamScore(2)
                .awayTeamScore(1)
                .build();

        Match savedMatch = Match.builder()
                .matchID(1L)
                .entryCreated(LocalDate.of(2025,1,1))
                .matchDate(request.matchDate())
                .homeTeam("Team A")
                .awayTeam("Team B")
                .homeTeamScore(2)
                .awayTeamScore(1)
                .winningTeam("Team A")
                .build();

        when(matchRepository.save(any(Match.class)))
                .thenReturn(savedMatch);

        MatchResponseDTO response =
                matchService.submitMatchScore(request);

        assertEquals("Team A", response.winningTeam());
        verify(matchRepository).save(any(Match.class));
    }

    @Test
    void submitMatchScore_draw() {
        CreateMatchRequestDTO request = CreateMatchRequestDTO.builder()
                .matchDate(LocalDate.now())
                .homeTeam("Team A")
                .awayTeam("Team B")
                .homeTeamScore(1)
                .awayTeamScore(1)
                .build();

        Match savedMatch = Match.builder()
                .matchID(2L)
                .matchDate(LocalDate.now())
                .entryCreated(LocalDate.of(2025,1,1))
                .homeTeam("Team A")
                .awayTeam("Team B")
                .homeTeamScore(1)
                .awayTeamScore(1)
                .winningTeam("DRAW")
                .build();

        when(matchRepository.save(any(Match.class)))
                .thenReturn(savedMatch);

        MatchResponseDTO response =
                matchService.submitMatchScore(request);

        assertEquals("DRAW", response.winningTeam());
    }

    @Test
    void getAllMatches_returnsAllMatchesAsDTOs() {
        Match match1 = Match.builder()
                .matchID(1L)
                .entryCreated(LocalDate.of(2025,1,1))
                .matchDate(LocalDate.now())
                .homeTeam("Team A")
                .awayTeam("Team B")
                .winningTeam("Team A")
                .build();

        Match match2 = Match.builder()
                .matchID(2L)
                .entryCreated(LocalDate.of(2025,1,1))
                .matchDate(LocalDate.now())
                .homeTeam("Team C")
                .awayTeam("Team D")
                .winningTeam("DRAW")
                .build();

        when(matchRepository.findAll())
                .thenReturn(List.of(match1, match2));

        List<MatchResponseDTO> result =
                matchService.getAllMatches();

        assertEquals(2, result.size());
        assertEquals("Team A", result.get(0).winningTeam());
        assertEquals("DRAW", result.get(1).winningTeam());
    }

    @Test
    void findMatchesByTeam_filtersByHomeOrAwayTeam_caseInsensitive() {
        Match match1 = Match.builder()
                .matchID(1L)
                .entryCreated(LocalDate.of(2025,1,1))
                .matchDate(LocalDate.now())
                .homeTeam("Team A")
                .awayTeam("Team B")
                .build();

        Match match2 = Match.builder()
                .matchID(2L)
                .entryCreated(LocalDate.of(2025,1,1))
                .matchDate(LocalDate.now())
                .homeTeam("Team C")
                .awayTeam("Team D")
                .build();

        when(matchRepository.findAll())
                .thenReturn(List.of(match1, match2));

        List<MatchResponseDTO> result =
                matchService.findMatchesByTeam("team A");

        assertEquals(1, result.size());
        assertEquals("Team A", result.get(0).homeTeam());
    }
}
