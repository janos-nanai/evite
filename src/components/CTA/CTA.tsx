import { FormEvent } from "react";

const CTA = () => {
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className="section-cta">
      <div className="cta u-center-text">
        <h2 className="cta__heading">Jössz, ugye?!</h2>
      </div>
      <hr className="cta__line" />
      <div className="cta">
        <form action="submit" onSubmit={submitHandler}>
          <div>
            <input className="cta__radio" type="radio" id="yes" name="reply" />{" "}
            <label className="cta__label" htmlFor="yes">
              Igen!
            </label>
          </div>
          <div>
            <input className="cta__radio" type="radio" id="no" name="reply" />{" "}
            <label className="cta__label" htmlFor="no">
              Nem, bocsi... :(
            </label>
          </div>
          <button className="btn btn--light cta__btn" formAction="submit">
            tovább
          </button>
        </form>
      </div>
    </section>
  );
};

export default CTA;
