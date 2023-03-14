package jhipster_java.service;

import java.util.List;
import javax.transaction.Transactional;
import jhipster_java.domain.Potrosnja;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PotrosnjaService {

    private Integer ukupno;

    public List<Potrosnja> predjeno() {
        ukupno = 45 * 2;
        System.out.println("Ukupno je: " + this.ukupno);
    }
}
