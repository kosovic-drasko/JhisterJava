package jhipster_java.domain;

import static org.assertj.core.api.Assertions.assertThat;

import jhipster_java.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PotrosnjaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Potrosnja.class);
        Potrosnja potrosnja1 = new Potrosnja();
        potrosnja1.setId(1L);
        Potrosnja potrosnja2 = new Potrosnja();
        potrosnja2.setId(potrosnja1.getId());
        assertThat(potrosnja1).isEqualTo(potrosnja2);
        potrosnja2.setId(2L);
        assertThat(potrosnja1).isNotEqualTo(potrosnja2);
        potrosnja1.setId(null);
        assertThat(potrosnja1).isNotEqualTo(potrosnja2);
    }
}
