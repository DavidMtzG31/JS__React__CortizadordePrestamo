import { useState, useEffect } from "react";
import Header from "./components/Header";
import Botones from "./components/Botones";
import { formatearCantidad, calcularTotalPagar } from './helpers';

function App() {

  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  useEffect( () => {
    setTotal(calcularTotalPagar(cantidad,meses));

    // Calcular pago mensual
    setPago(total / meses);
  },[cantidad, meses, total])
  


  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  function handleCantidad(e) {
    setCantidad( Number(e.target.value));
  }

  function handleClickDecremento() {
    const valor = cantidad - STEP;

    if( valor < MIN ) {
      alert('No digas mamadas papito como que quieres menos que cero');
      setCantidad(0);
      return;
    }

    setCantidad(valor)
  }

  function handleClickIncremento() {
    const valor = cantidad + STEP;

    if( valor > MAX ) {
      alert('No digas mamadas papito como que quieres más si estás en buró');
      setCantidad(20000);
      return;
    }

    setCantidad(valor)
  }


  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header/>

      <div className="flex justify-between mt-6"> 
        <Botones
          operador='-'
          fn={handleClickDecremento}
        />

        <Botones
          operador='+'
          fn={handleClickIncremento}
        /> 
      </div>

      <input 
        type="range"
        className="my-5 w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        onChange={ handleCantidad }
        min = {MIN}
        max = {MAX}
        step = {STEP}
        value={cantidad}
        />

      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600"> {formatearCantidad(cantidad)} </p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span className="text-indigo-600">Plazo</span> a pagar
      </h2>

      <select className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
              value={Number(meses)}
              onChange={ (e) => { setMeses(Number(e.target.value)) }}
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Resumen <span className="text-indigo-600"> de Pagos</span>
        </h2>

        <p className="text-xl text-gray-500 text-center font-bold">Plazo: {meses} meses</p>
        <p className="text-xl text-gray-500 text-center font-bold">Abono Mensual: {formatearCantidad(pago)}</p>
        <p className="text-xl text-gray-500 text-center font-bold">Total a pagar: {formatearCantidad(total)}</p>
      </div>



    </div> /* Fin del div principal*/
  )
}

export default App
