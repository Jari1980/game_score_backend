package SportScore.Sport.service;

import SportScore.Sport.domain.dto.CreateMatchRequestDTO;
import SportScore.Sport.domain.dto.MatchResponseDTO;
import SportScore.Sport.domain.entity.Match;
import SportScore.Sport.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private MatchRepository matchRepository;

    @Autowired
    public MatchService(MatchRepository matchRepository){
        this.matchRepository = matchRepository;
    }

    public MatchResponseDTO submitMatchScore(CreateMatchRequestDTO dto){
        //Building entity
        Match match = Match.builder()
                .entryCreated(LocalDate.now())
                .matchDate(dto.matchDate())
                .homeTeam(dto.homeTeam())
                .awayTeam(dto.awayTeam())
                .homeTeamScore(dto.homeTeamScore())
                .awayTeamScore(dto.awayTeamScore())
                .build();

        //Adding winning team to match using helper function
        match.setWinningTeam(calculateWinningTeam(dto.homeTeam(), dto.awayTeam(), dto.homeTeamScore(), dto.awayTeamScore()));

        //Saving to db
        Match saved = matchRepository.save(match);

        //Creating and returning MatchResponseDTO
        return MatchResponseDTO.builder()
                .matchId(saved.getMatchID())
                .matchDate(saved.getMatchDate())
                .homeTeam(saved.getHomeTeam())
                .awayTeam(saved.getAwayTeam())
                .homeTeamScore(saved.getHomeTeamScore())
                .awayTeamScore(saved.getAwayTeamScore())
                .winningTeam(saved.getWinningTeam())
                .build();
    }

    public List<MatchResponseDTO> getAllMatches(){
        return matchRepository.findAll()
                .stream()
                .map(match -> MatchResponseDTO.builder()
                        .matchId(match.getMatchID())
                        .matchDate(match.getMatchDate())
                        .homeTeam(match.getHomeTeam())
                        .awayTeam(match.getAwayTeam())
                        .homeTeamScore(match.getHomeTeamScore())
                        .awayTeamScore(match.getAwayTeamScore())
                        .winningTeam(match.getWinningTeam())
                        .build()
                )
                .toList();
    }

    public List<MatchResponseDTO> findMatchesByTeam(String team){
        // Fetch all matches
        List<Match> allMatches = matchRepository.findAll();

        // Filter matches where team is either home or away
        List<Match> filtered = allMatches.stream()
                .filter(match -> match.getHomeTeam().equalsIgnoreCase(team)
                        || match.getAwayTeam().equalsIgnoreCase(team))
                .collect(Collectors.toList());

        // Convert entity to DTO
        return filtered.stream()
                .map(match -> MatchResponseDTO.builder()
                        .matchId(match.getMatchID())
                        .matchDate(match.getMatchDate())
                        .homeTeam(match.getHomeTeam())
                        .awayTeam(match.getAwayTeam())
                        .homeTeamScore(match.getHomeTeamScore())
                        .awayTeamScore(match.getAwayTeamScore())
                        .winningTeam(match.getWinningTeam())
                        .build())
                .collect(Collectors.toList());
    }

    //Helper function for calculating winning team
    private String calculateWinningTeam(String homeTeam, String awayTeam, int homeScore, int awayScore){
        if(homeScore > awayScore) return homeTeam;
        if(awayScore > homeScore) return awayTeam;
        return "DRAW";
    }
}
