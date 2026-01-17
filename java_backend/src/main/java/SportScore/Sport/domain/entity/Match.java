package SportScore.Sport.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Builder
@Entity
@Table(name = "matches")
public class Match {
    @Id
    //@NonNull this will start as null, when calling matchrepository.save(match) ID is generated when saved
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matchID;
    @NonNull
    private LocalDate entryCreated;
    @NonNull
    private LocalDate matchDate;
    @NonNull
    private String homeTeam;
    @NonNull
    private String awayTeam;
    @NonNull
    private int homeTeamScore;
    @NonNull
    private int awayTeamScore;
    //@NonNull this is set with helper function hence null at start, could give it a initial value instead this way goes aswell
    private String winningTeam;
}
