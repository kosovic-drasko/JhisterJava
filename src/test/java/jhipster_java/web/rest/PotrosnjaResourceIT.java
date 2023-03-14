package jhipster_java.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import jhipster_java.IntegrationTest;
import jhipster_java.domain.Potrosnja;
import jhipster_java.repository.PotrosnjaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PotrosnjaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PotrosnjaResourceIT {

    private static final Integer DEFAULT_PREDJENO_KM = 1;
    private static final Integer UPDATED_PREDJENO_KM = 2;

    private static final String ENTITY_API_URL = "/api/potrosnjas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PotrosnjaRepository potrosnjaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPotrosnjaMockMvc;

    private Potrosnja potrosnja;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Potrosnja createEntity(EntityManager em) {
        Potrosnja potrosnja = new Potrosnja().predjenoKm(DEFAULT_PREDJENO_KM);
        return potrosnja;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Potrosnja createUpdatedEntity(EntityManager em) {
        Potrosnja potrosnja = new Potrosnja().predjenoKm(UPDATED_PREDJENO_KM);
        return potrosnja;
    }

    @BeforeEach
    public void initTest() {
        potrosnja = createEntity(em);
    }

    @Test
    @Transactional
    void getAllPotrosnjas() throws Exception {
        // Initialize the database
        potrosnjaRepository.saveAndFlush(potrosnja);

        // Get all the potrosnjaList
        restPotrosnjaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(potrosnja.getId().intValue())))
            .andExpect(jsonPath("$.[*].predjenoKm").value(hasItem(DEFAULT_PREDJENO_KM)));
    }

    @Test
    @Transactional
    void getPotrosnja() throws Exception {
        // Initialize the database
        potrosnjaRepository.saveAndFlush(potrosnja);

        // Get the potrosnja
        restPotrosnjaMockMvc
            .perform(get(ENTITY_API_URL_ID, potrosnja.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(potrosnja.getId().intValue()))
            .andExpect(jsonPath("$.predjenoKm").value(DEFAULT_PREDJENO_KM));
    }

    @Test
    @Transactional
    void getNonExistingPotrosnja() throws Exception {
        // Get the potrosnja
        restPotrosnjaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }
}
