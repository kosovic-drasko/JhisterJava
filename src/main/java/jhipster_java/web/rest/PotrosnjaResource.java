package jhipster_java.web.rest;

import java.util.List;
import java.util.Optional;
import jhipster_java.service.PotrosnjaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link jhipster_java.domain.Potrosnja}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PotrosnjaResource {

    private final Logger log = LoggerFactory.getLogger(PotrosnjaResource.class);

    private final PotrosnjaService potrosnjaService;

    public PotrosnjaResource(PotrosnjaService potrosnjaService) {
        this.potrosnjaService = potrosnjaService;
    }

    /**
     * {@code GET  /potrosnjas} : get all the potrosnjas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of potrosnjas in body.
     */
    @GetMapping("/potrosnjas/{prosjekGradsaka}/{presaoKm}")
    public int getAllPotrosnjas(@PathVariable int prosjekGradsaka, @PathVariable int presaoKm) {
        log.debug("REST request to get all Potrosnjas");
        return potrosnjaService.predjeno(prosjekGradsaka, presaoKm);
    }
}
