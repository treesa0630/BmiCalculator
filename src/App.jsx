import * as React from 'react';
import { Input, Typography } from '@mui/material'
import './App.css'
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { GaugeComponent } from 'react-gauge-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [BMI, setBMI] = React.useState(0)
  const [condition, setCondition] = React.useState("")
  const [instruction, setInstruction] = React.useState("")
  const [isPositive, setIsPositive] = React.useState(true)

  const reset = () => {
    setWeight(0)
    setHeight(0)
    setBMI(0)
    setCondition("")
    setInstruction("")
  }

  // Weight
  const [weight, setWeight] = React.useState(0);
  const handleSliderChange = (event, newValue) => {
    setWeight(newValue);
  };
  const handleInputChange = (event) => {
    setWeight(event.target.value === '' ? 0 : Number(event.target.value));
  };
  const handleBlur = () => {
    if (weight < 0) {
      setWeight(0);
    } else if (weight > 150) {
      setWeight(150);
    }
  };


  // Height
  const [height, setHeight] = React.useState(0);
  const handleHeightChange = (event, newValue) => {
    setHeight(newValue);
  };
  const handleHeightInputChange = (event) => {
    setHeight(event.target.value === '' ? 0 : Number(event.target.value));
  };
  const handleHeightBlur = () => {
    if (height < 0) {
      setHeight(0);
    } else if (height > 200) {
      setHeight(200);
    }
  };

  const calculate = () => {
    if (height == "" || weight == "") {
      toast.error('Please enter a valid height and weight')
    }
    else {
      let result = ((weight / (height / 100) ** 2).toFixed(1))
      setBMI(result)

      if (result <= 18.5) {

        setCondition('UNDERWEIGHT ');
        setIsPositive(false)
        setInstruction('"Maintain balanced diet, exercise regularly, consult a doctor."');
      }
      else if (result >= 18.5 && result < 24.9) {
        setCondition('HEALTHY ')
        setIsPositive(true)
        setInstruction('"Balanced body, thriving health always!"');
      }
      else if (result >= 25.0 && result < 39.9) {
        setCondition('OVERWEIGHT ');
        setIsPositive(false)
        setInstruction('"Focus on balanced diet, regular exercise, hydration, and consult a healthcare professional for guidance."');
      }
      else {
        setCondition('OBESE ');
        setIsPositive(false)
        setInstruction('Consult healthcare provider for personalized weight management plan.');

      }
    }
  }

  return (
    <>
      <div className='mainbody'>
        <div style={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.705)', padding: '0px' }}>
          <h1 className='text-light text-center pt-5'>Calculate Your<span style={{ color: 'lightyellow' }}> BMI</span></h1>
          <div className='mt-5 pt-md-5 d-flex align-items-center justify-content-center'>
            <div className='calculator row w-100  rounded-5 ' >
              <div className="col-md-1"></div>

              <div className="col-md-5  p-5">

                {/* Weight */}

                <Typography id="input-slider" className='text-light pt-5' gutterBottom>
                  Weight
                </Typography>
                <div className='d-flex'>
                  <div className='w-100'>
                    <Slider style={{ color: 'whitesmoke' }}
                      value={typeof weight === 'number' ? weight : 0}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                      min={0}
                      max={150}
                    />
                  </div>
                  <div>
                    <Input style={{ color: 'whitesmoke', marginLeft: '10px' }}
                      value={weight}
                      size="small"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 250,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />
                  </div><span className='text-light'>Kg</span>
                </div>


                <Typography id="input-slider" className='text-light pt-5' gutterBottom>
                  Height
                </Typography>
                <div className='d-flex'>
                  <div className='w-100'>
                    <Slider style={{ color: 'whitesmoke' }}
                      value={typeof height === 'number' ? height : 0}
                      onChange={handleHeightChange}
                      aria-labelledby="input-slider"
                      min={0}
                      max={200}
                    />
                  </div>
                  <div>
                    <Input style={{ color: 'whitesmoke', marginLeft: '10px' }}
                      value={height}
                      size="small"
                      onChange={handleHeightInputChange}
                      onBlur={handleHeightBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 200,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />
                  </div><span className='text-light'>Cm</span>
                </div>

                <div className=" d-flex justify-content-between mt-5 mb-2 mt-md-5">
                  <div ><Button style={{ backgroundColor: 'darkgreen' }} className='text-white rounded-5 py-3 px-4 ' onClick={reset}>RESET</Button></div>
                  <div ><Button style={{ backgroundColor: 'darkgreen' }} className='text-white rounded-5 py-3 px-3 ms-2' onClick={calculate}>CALCULATE</Button></div>
                </div>

              </div>

              <div className="col-md-5 pb-5 py-md-5">
                <h4 className='text-white text-center'>You are <h1 className={isPositive ? 'positive' : 'negative'}>{condition}</h1></h4>
                <p className='instruction text-center'>{instruction}</p>


                <GaugeComponent
                  type="semicircle"
                  labels={{
                    valueLabel: {
                      formatTextValue: (value) => `${BMI}`
                    }
                  }}
                  arc={{
                    colorArray: ['#00FF15', '#FF2121'],
                    padding: 0.02,
                    subArcs:
                      [
                        { limit: 40 },
                        { limit: 60 },
                        { limit: 70 },
                        {},
                        {},
                        {},
                        {}
                      ]
                  }}
                  pointer={{ type: "arrow", animationDelay: 0 }}
                  value={BMI}
                />
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
