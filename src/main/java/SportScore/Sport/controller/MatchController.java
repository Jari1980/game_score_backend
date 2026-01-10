package SportScore.Sport.controller;

import SportScore.Sport.domain.dto.CreateMatchRequestDTO;
import SportScore.Sport.domain.dto.MatchResponseDTO;
import SportScore.Sport.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "", allowPrivateNetwork = "")
@RequestMapping("/api/v1/match")
@RestController
public class MatchController {

    private final MatchService matchService;

    @Autowired
    public MatchController(MatchService matchService){
        this.matchService = matchService;
    }

    //Submit match score
    @PostMapping
    public ResponseEntity<MatchResponseDTO> submitMatchScore(@RequestBody CreateMatchRequestDTO request){
        MatchResponseDTO response = matchService.submitMatchScore(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //Get all matches
    @GetMapping
    public ResponseEntity<List<MatchResponseDTO>> getMatches(){
        List<MatchResponseDTO> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }

    //Search by team
    @GetMapping("/search")
    public ResponseEntity<List<MatchResponseDTO>> searchByTeam(@RequestParam String team){
        List<MatchResponseDTO> matches = matchService.findMatchesByTeam(team);
        return ResponseEntity.ok(matches);
    }
}
