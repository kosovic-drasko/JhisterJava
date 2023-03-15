package jhipster_java.service;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PotrosnjaService {

    private int ukupno;

    // @Transactional
    public int predjeno(int prosjekGradska, int presaoKm) {
        ukupno = prosjekGradska * presaoKm;
        // System.out.println("Ukupno je: " + this.ukupno);
        return ukupno;
    }
}
