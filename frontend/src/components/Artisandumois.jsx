      {/* SECTION : Nos artisans du mois */}
      <section className="py-5">
        <div className="container">
          <h3 className="fw-bold mb-4 text-start text-primary">Nos artisans du mois</h3>
          <div className="row align-items-center g-4">

            {/* Image artisan */}
            <div className="col-md-4 text-center">
              <img
                src="/images/boulanger.png"
                alt="Boulanger"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </div>

            {/* Infos artisan */}
            <div className="col-md-8">
              <div className="p-4 bg-light rounded shadow-sm">
                <h2 className="fw-bold text-primary">Au pain chaud</h2>
                <h4 className="text-secondary">Boulanger</h4>
                <p className="text-muted">Montélimar</p>
                <Link to="/artisan/2" className="btn btn-primary">Voir mon artisan</Link>
                <div className="mt-3">
                  ⭐⭐⭐⭐☆ <strong>4.8</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
