package jhipster_java.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * A Potrosnja.
 */
@Entity
@Table(name = "potrosnja")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Potrosnja implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "predjeno_km")
    private Integer predjenoKm;

    @Column(name = "prosjek_gradska")
    private Integer prosjekGradska;

    //prosjekGradsaka
    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Potrosnja id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPredjenoKm() {
        return this.predjenoKm;
    }

    public Potrosnja predjenoKm(Integer predjenoKm) {
        this.setPredjenoKm(predjenoKm);
        return this;
    }

    public void setPredjenoKm(Integer predjenoKm) {
        this.predjenoKm = predjenoKm;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Potrosnja)) {
            return false;
        }
        return id != null && id.equals(((Potrosnja) o).id);
    }

    public Integer getProsjekGradska() {
        return prosjekGradska;
    }

    public void setProsjekGradska(Integer prosjekGradska) {
        this.prosjekGradska = prosjekGradska;
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Potrosnja{" +
            "id=" + getId() +
            ", predjenoKm=" + getPredjenoKm() +
            "}";
    }
}
