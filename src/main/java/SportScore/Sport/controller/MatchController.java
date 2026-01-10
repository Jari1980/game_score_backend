package SportScore.Sport.controller;

import SportScore.Sport.domain.dto.CreateMatchRequestDTO;
import SportScore.Sport.domain.dto.MatchResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "", allowPrivateNetwork = "")
@RequestMapping("/api/v1/match")
@RestController
public class MatchController {

    //Adding dependency injection for matchservice here after initial

    //Submit match score
    @PostMapping
    public ResponseEntity<MatchResponseDTO> submitMatchScore(@RequestBody CreateMatchRequestDTO request){
        //MatchResponseDTO response should come from services and be passed in return body
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    //Get all matches
    @GetMapping
    public ResponseEntity<List<MatchResponseDTO>> getMatches(){
        //List<MatchresponseDTO> matches should come from services and be passed as result
        return ResponseEntity.ok(null);
    }

    //Search by team
    @GetMapping("/search")
    public ResponseEntity<List<MatchResponseDTO>> searchByTeam(@RequestParam String team){
        //List<MatchResponseDTO> matches should come from service and passed as result
        return ResponseEntity.ok(null);
    }
}
