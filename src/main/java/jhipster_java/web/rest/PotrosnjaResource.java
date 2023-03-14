package jhipster_java.web.rest;

import java.util.List;
import java.util.Optional;
import jhipster_java.domain.Potrosnja;
import jhipster_java.repository.PotrosnjaRepository;
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

    private final PotrosnjaRepository potrosnjaRepository;
    private final PotrosnjaService potrosnjaService;

    public PotrosnjaResource(PotrosnjaRepository potrosnjaRepository, PotrosnjaService potrosnjaService) {
        this.potrosnjaRepository = potrosnjaRepository;
        this.potrosnjaService = potrosnjaService;
    }

    /**
     * {@code GET  /potrosnjas} : get all the potrosnjas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of potrosnjas in body.
     */
    @GetMapping("/potrosnjas")
    public List<Potrosnja> getAllPotrosnjas() {
        log.debug("REST request to get all Potrosnjas");
        return potrosnjaService.predjeno();
    }

    /**
     * {@code GET  /potrosnjas/:id} : get the "id" potrosnja.
     *
     * @param id the id of the potrosnja to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the potrosnja, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/potrosnjas/{id}")
    public ResponseEntity<Potrosnja> getPotrosnja(@PathVariable Long id) {
        log.debug("REST request to get Potrosnja : {}", id);
        Optional<Potrosnja> potrosnja = potrosnjaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(potrosnja);
    }
}
