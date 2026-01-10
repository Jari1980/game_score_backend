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
    @NonNull
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
    @NonNull
    private String winningTeam;
}
