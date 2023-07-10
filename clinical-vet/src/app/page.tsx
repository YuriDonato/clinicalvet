import Image from 'next/image'

export default function Home() {
  return (
    <center>
      <div className="container">
        <img className="imgPawsHomePage" src="/dogPaws.png" alt="Dog Paws crossing the screen"/>
        <section className='header'>
          <div className="container">
            <center>
              <h1 className='text-white mb-8 titleHomePage text-5xl'>Clinical.vet</h1>
              <img className="imgDogCatHomePage" src="/dogcatHomePage.png" alt="Dog and Cat"/>
            </center>
          </div>
        </section>
      </div>

    <hr className='horizontalLine' />

      <section className="options grid grid-cols-3 content-between gap-5">
        <div className='option'>
          <a href="#">
            <img className='circleImage linkImage' src="homepagehemograma.png" alt="" />
            <h2 className='linkText'>Leitor de Hemograma</h2>
          </a>
        </div>
        <div className='option'>
          <a href="#">            
            <img className='circleImage linkImage' src="homepageclinica.png" alt="" />
            <h2 className='linkText'>Clinica</h2>
          </a>
        </div>
        <div className='option'>
          <a href="#">
            <img className='circleImage linkImage' src="homepagedoenca.png" alt="" />
            <h2 className='linkText'>Doenças</h2>
          </a>
        </div>
      </section>
    </center>
    
  )
}
