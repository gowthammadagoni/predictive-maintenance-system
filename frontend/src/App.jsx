import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    temperature: "",
    vibration: "",
    pressure: "",
    rpm: "",
    current: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const predictMachine = async () => {
    const values = Object.values(formData);

    if (values.some((value) => value === "")) {
      setResult({
        error: true,
        status: "Missing Sensor Data",
        message: "Please enter all sensor values before predicting.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temperature: Number(formData.temperature),
          vibration: Number(formData.vibration),
          pressure: Number(formData.pressure),
          rpm: Number(formData.rpm),
          current: Number(formData.current),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Prediction failed");
      }

      setResult(data);
    } catch (error) {
      setResult({
        error: true,
        status: "Backend Connection Error",
        message:
          error.message ||
          "Make sure your FastAPI backend is running on port 8000.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          ⚙️ Predictive Maintenance
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          System Online
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container">

        {/* HERO */}
        <section className="hero-section">
          <p className="subtitle">
            AI-POWERED INDUSTRIAL MONITORING
          </p>

          <h1>
            Predict Machine
            <span> Failure Before It Happens</span>
          </h1>

          <p className="description">
            Enter the machine sensor readings below to predict whether
            the machine is operating normally or is at risk of failure.
          </p>
        </section>

        {/* DASHBOARD */}
        <section className="dashboard">

          {/* INPUT CARD */}
          <div className="card input-card">

            <div className="card-header">
              <div>
                <h2>Machine Sensor Data</h2>
                <p>Enter the current machine measurements</p>
              </div>

              <div className="sensor-icon">
                📊
              </div>
            </div>

            {/* SENSOR INPUTS */}
            <div className="form-grid">

              {/* TEMPERATURE */}
              <div className="input-group">
                <label>Temperature</label>

                <input
                  type="number"
                  name="temperature"
                  placeholder="Example: 75"
                  value={formData.temperature}
                  onChange={handleChange}
                />
              </div>

              {/* VIBRATION */}
              <div className="input-group">
                <label>Vibration</label>

                <input
                  type="number"
                  name="vibration"
                  placeholder="Example: 2.5"
                  value={formData.vibration}
                  onChange={handleChange}
                />
              </div>

              {/* PRESSURE */}
              <div className="input-group">
                <label>Pressure</label>

                <input
                  type="number"
                  name="pressure"
                  placeholder="Example: 30"
                  value={formData.pressure}
                  onChange={handleChange}
                />
              </div>

              {/* RPM */}
              <div className="input-group">
                <label>RPM</label>

                <input
                  type="number"
                  name="rpm"
                  placeholder="Example: 1500"
                  value={formData.rpm}
                  onChange={handleChange}
                />
              </div>

              {/* CURRENT */}
              <div className="input-group full-width">
                <label>Current</label>

                <input
                  type="number"
                  name="current"
                  placeholder="Example: 10"
                  value={formData.current}
                  onChange={handleChange}
                />
              </div>

            </div>

            {/* PREDICT BUTTON */}
            <button
              className="predict-button"
              onClick={predictMachine}
              disabled={loading}
            >
              {loading
                ? "Analyzing Machine..."
                : "🔍 Predict Machine Status"}
            </button>

          </div>

          {/* RESULT CARD */}
          <div className="card result-card">

            <div className="card-header">
              <div>
                <h2>Prediction Result</h2>
                <p>AI analysis of machine condition</p>
              </div>

              <div className="result-icon">
                🤖
              </div>
            </div>

            {/* BEFORE PREDICTION */}
            {!result && (
              <div className="empty-result">

                <div className="big-icon">
                  ⚙️
                </div>

                <h3>
                  Waiting for Prediction
                </h3>

                <p>
                  Enter the sensor values and click
                  the prediction button.
                </p>

              </div>
            )}

            {/* ERROR */}
            {result?.error && (
              <div className="prediction-result">

                <div className="result-status failure">

                  <div className="result-symbol">
                    ⚠️
                  </div>

                  <div>
                    <h3>
                      {result.status}
                    </h3>

                    <p>
                      {result.message}
                    </p>
                  </div>

                </div>

              </div>
            )}

            {/* SUCCESSFUL PREDICTION */}
            {result && !result.error && (
              <div className="prediction-result">

                <div
                  className={`result-status ${
                    result.prediction === 1 ||
                    result.status === "Failure Risk"
                      ? "failure"
                      : "normal"
                  }`}
                >

                  <div className="result-symbol">
                    {result.prediction === 1 ||
                    result.status === "Failure Risk"
                      ? "⚠️"
                      : "✅"}
                  </div>

                  <div>

                    <h3>
                      {result.status || "Prediction Complete"}
                    </h3>

                    {result.prediction !== undefined && (
                      <p>
                        Prediction:{" "}
                        <strong>
                          {result.prediction}
                        </strong>
                      </p>
                    )}

                  </div>

                </div>

                {/* FAILURE PROBABILITY */}
                {result.failure_probability !== undefined && (
                  <div className="result-message">

                    <strong>
                      Failure Probability
                    </strong>

                    <p>
                      {typeof result.failure_probability === "number"
                        ? `${result.failure_probability.toFixed(2)}%`
                        : result.failure_probability}
                    </p>

                  </div>
                )}

                {/* MESSAGE */}
                {result.message && (
                  <div className="result-message">

                    <strong>
                      Analysis
                    </strong>

                    <p>
                      {result.message}
                    </p>

                  </div>
                )}

              </div>
            )}

          </div>

        </section>

        {/* HOW IT WORKS */}
        <section className="info-section">

          <div className="info-box">

            <span>01</span>

            <div>
              <h3>
                Collect Sensor Data
              </h3>

              <p>
                Temperature, vibration, pressure,
                RPM and current are collected from
                the machine.
              </p>
            </div>

          </div>

          <div className="info-box">

            <span>02</span>

            <div>
              <h3>
                Machine Learning
              </h3>

              <p>
                The trained ML model analyzes the
                sensor readings and predicts the
                machine condition.
              </p>
            </div>

          </div>

          <div className="info-box">

            <span>03</span>

            <div>
              <h3>
                Early Warning
              </h3>

              <p>
                The system identifies potential
                machine failure before breakdown.
              </p>
            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer>
        Predictive Maintenance System • Machine Learning Project
      </footer>

    </div>
  );
}

export default App;