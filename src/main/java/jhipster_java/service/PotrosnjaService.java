package jhipster_java.service;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PotrosnjaService {

    private int ukupno;

    @Transactional
    public int predjeno() {
        ukupno = 45 * 2;
        // System.out.println("Ukupno je: " + this.ukupno);
        return ukupno;
    }
}
