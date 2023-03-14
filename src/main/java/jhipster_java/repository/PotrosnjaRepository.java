package jhipster_java.repository;

import jhipster_java.domain.Potrosnja;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Potrosnja entity.
 */

@Repository
public interface PotrosnjaRepository extends JpaRepository<Potrosnja, Long> {}
