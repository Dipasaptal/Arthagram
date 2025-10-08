import React, { useState } from "react";
import Footer from '../components/Footer';

const Calculator = () => {
  const formTypes = {
    fdCalculator: {
      title: "Fixed Deposit Calculator",
      fields: [
        { name: "principal", label: "FD Investment (₹)", type: "number", required: true },
        { name: "tenure", label: "Number of Years", type: "number", required: true },
        { name: "interestRate", label: "Interest Rate (%)", type: "number", required: true }
      ],
    },
    rd: {
      title: "Recurring Deposit (RD)",
      fields: [
        { name: "monthlyDeposit", label: "Monthly Deposit", type: "number", required: true },
        { name: "interestRate", label: "Interest Rate (%)", type: "number", required: true },
        { name: "years", label: "Years", type: "number", required: true },
      ],
    },
    pigmi: {
      title: "Daily Pigmi Calculator",
      fields: [
        { name: "date", label: "Date of Daily Deposit", type: "date", required: true },
        { name: "customerType", label: "Type of Customer", type: "text", required: true },
        { name: "plan", label: "Select Plan", type: "select", options: [
          "50 days -5.5%",
          "100 days -6.5%",
          "200 days -7%",
          "300 days -7.5%",
          "360 days -7.5%",
          "360 days above -7.5%"
         ], required: true },
        { name: "interestRate", label: "Interest Rate (%)", type: "number", required: true },
        { name: "amount", label: "Deposit Amount (₹)", type: "number", required: true }
      ],
    },
    GoldFd: {
      title: "Gold Fixed Deposit (FD)",
      fields: [
        { name: "principal", label: "Principal Amount", type: "number", required: true },
        { name: "interestRate", label: "Interest Rate (%)", type: "number", required: true },
        { name: "tenure", label: "Tenure (Years)", type: "number", required: true },
      ],
    },
    loanEmiCalculator: {
      title: "Loan EMI Calculator",
      fields: [
        { name: "loanAmount", label: "Loan Amount (₹)", type: "number", required: true },
        { name: "interestRate", label: "Interest Rate (%)", type: "number", required: true },
        { name: "tenure", label: "Tenure", type: "select", options: ["50 Days", "100 Days", "150 Days", "6 Months", "12 Months", "2 Years", "3 Years", "5 Years"], required: true },
      ],
    },
  };

  const [selectedForm, setSelectedForm] = useState("fdCalculator");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSelection = (formType) => {
    setSelectedForm(formType);
    setFormData({});
    setResult(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let calculatedResult = null;
  
    if (selectedForm === "fdCalculator") {
      // Fixed Deposit Calculation
      const P = parseFloat(formData.principal);
      const r = parseFloat(formData.interestRate) / 100;
      const t = parseFloat(formData.tenure);
      const n = 1; // Assuming yearly compounding
  
      if (P && r && t) {
        calculatedResult = P * Math.pow(1 + r / n, n * t);
      }
    } else if (selectedForm === "rd") {
      // Recurring Deposit Calculation
      const P = parseFloat(formData.monthlyDeposit);
      const r = parseFloat(formData.interestRate) / 100 / 12; // Monthly interest rate
      const n = parseFloat(formData.years) * 12; // Total months
  
      if (P && r && n) {
        const totalInvestment = P * n; // Total amount invested
        const maturityAmount = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r)); // Maturity amount
        const aggregateInterest = maturityAmount - totalInvestment; // Aggregate interest
  
        // Set the result to show the aggregate interest
        setResult({
          aggregateInterest: `₹${aggregateInterest.toFixed(2)}`,
          maturityAmount: `₹${maturityAmount.toFixed(2)}`,
          totalInvestment: `₹${totalInvestment.toFixed(2)}`,
        });
        return; // Exit the function to avoid setting calculatedResult
      }
    } else if (selectedForm === "loanEmiCalculator") {
      // Loan EMI Calculation
      const P = parseFloat(formData.loanAmount); // Loan amount
      const r = parseFloat(formData.interestRate) / 100 / 12; // Monthly interest rate
      const tenure = formData.tenure; // Tenure (e.g., "2 Years", "6 Months", etc.)
      let n = 0; // Tenure in months
    
      // Convert tenure to months
      if (tenure.includes("Days")) {
        n = parseInt(tenure) / 30; // Convert days to months
      } else if (tenure.includes("Months")) {
        n = parseInt(tenure);
      } else if (tenure.includes("Years")) {
        n = parseInt(tenure) * 12;
      }
    
      if (P && r && n) {
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n; // Total payment over the loan tenure
        const totalInterest = totalPayment - P; // Total interest paid
    
        // Set the result to show EMI, total payment, and total interest
        setResult({
          emi: `₹${emi.toFixed(2)}`,
          totalPayment: `₹${totalPayment.toFixed(2)}`,
          totalInterest: `₹${totalInterest.toFixed(2)}`,
        });
        return; // Exit the function to avoid setting calculatedResult
      }
    
    } else if (selectedForm === "GoldFd") {
      // Gold Fixed Deposit Calculation
      const P = parseFloat(formData.principal);
      const r = parseFloat(formData.interestRate) / 100;
      const t = parseFloat(formData.tenure);
      const n = 1; // Assuming yearly compounding
  
      if (P && r && t) {
        calculatedResult = P * Math.pow(1 + r / n, n * t);
      }
    } else if (selectedForm === "pigmi") {
      // Daily Pigmi Calculation
      const plan = formData.plan || "";
      const match = plan.match(/ROI (\d+\.\d+)%/);
      const roi = match ? parseFloat(match[1]) : 0;
    
      const P = parseFloat(formData.amount); // Daily deposit amount
      const r = roi / 100 / 365; // Daily interest rate
      const years = plan.includes("2 YR") ? 2 : plan.includes("3 YR") ? 3 : 5;
      const n = years * 365; // Total days
    
      let totalDeposit = P * n; // Total deposited amount
      let maturityAmount = 0;
    
      if (P && r && n) {
        for (let i = 0; i < n; i++) {
          maturityAmount += P * Math.pow(1 + r, n - i);
        }
      }
    
      let interestAmount = maturityAmount - totalDeposit;
    
      // Calculate maturity date
      const maturityDate = new Date();
      maturityDate.setDate(maturityDate.getDate() + n);
    
      // Format the result
      setResult({
        rateOfInterest: `${roi.toFixed(2)} %`,
        maturityDate: maturityDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        totalDeposit: `Rs.${totalDeposit.toFixed(2)}`,
        interestAmount: `Rs.${interestAmount.toFixed(2)}`,
        maturityAmount: `Rs.${maturityAmount.toFixed(2)}`,
      });
      return; // Exit the function to avoid setting calculatedResult
    }
  
    // Default result for other calculators
    setResult(calculatedResult ? `₹${calculatedResult.toFixed(2)}` : "Invalid Input");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <div className="w-full md:w-72 bg-white shadow-lg border-r p-4 md:p-6">
          <h2 className="text-lg font-bold text-purple-700 mb-4">Popular Calculators</h2>
          <ul className="space-y-2 text-sm">
            {Object.keys(formTypes).map((type) => (
              <li key={type}>
                <button
                  onClick={() => handleFormSelection(type)}
                  className={`w-full py-2 px-4 border rounded-lg font-semibold transition-all ${
                    selectedForm === type ? "bg-purple-700 text-white" : "hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {formTypes[type].title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-2xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-lg border">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-4 md:mb-6">
              {formTypes[selectedForm].title}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formTypes[selectedForm].fields.map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="" disabled selected>
                          Select an option
                        </option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-red-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg font-bold hover:bg-red-600 transition duration-300"
                >
                  Calculate
                </button>
              </div>
            </form>

            {result && (
  <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
    {selectedForm === "loanEmiCalculator" ? (
      <>
        <h3 className="text-lg font-semibold text-gray-800">Loan EMI Result</h3>
        <p className="text-lg text-gray-700">
          EMI: <span className="font-bold text-black">{result.emi}</span>
        </p>
        <p className="text-lg text-gray-700">
          Total Payment: <span className="font-bold text-black">{result.totalPayment}</span>
        </p>
        <p className="text-lg text-gray-700">
          Total Interest: <span className="font-bold text-black">{result.totalInterest}</span>
        </p>
      </>
    ) : selectedForm === "pigmi" ? (
      <>
        <h3 className="text-lg font-semibold text-gray-800">Daily Pigmi Result</h3>
        <p className="text-lg text-gray-700">
          Rate of Interest (%): <span className="font-bold text-black">{result.rateOfInterest}</span>
        </p>
        <p className="text-lg text-gray-700">
          Maturity Date: <span className="font-bold text-black">{result.maturityDate}</span>
        </p>
        <p className="text-lg text-gray-700">
          Total Deposit Amount: <span className="font-bold text-black">{result.totalDeposit}</span>
        </p>
        <p className="text-lg text-gray-700">
          Interest Amount: <span className="font-bold text-black">{result.interestAmount}</span>
        </p>
        <p className="text-lg text-gray-700">
          Maturity Amount: <span className="font-bold text-black">{result.maturityAmount}</span>
        </p>
      </>
    ) : selectedForm === "rd" ? (
      <>
        <h3 className="text-lg font-semibold text-gray-800">Recurring Deposit Result</h3>
        <p className="text-lg text-gray-700">
          Aggregate Interest Amount: <span className="font-bold text-black">{result.aggregateInterest}</span>
        </p>
        <p className="text-lg text-gray-700">
          Maturity Amount: <span className="font-bold text-black">{result.maturityAmount}</span>
        </p>
        <p className="text-lg text-gray-700">
          Total Investment: <span className="font-bold text-black">{result.totalInvestment}</span>
        </p>
      </>
    ) : (
      <>
        <h3 className="text-lg font-semibold text-gray-800">Amount at Maturity:</h3>
        <p className="text-2xl font-bold text-green-600">{result}</p>
      </>
    )}
  </div>
)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Calculator;