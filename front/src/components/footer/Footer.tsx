import './footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const copyrightSymbol = String.fromCharCode(169);

  return (
    <div className='footer'>
        <span>{` ${copyrightSymbol}GDmedia ${currentYear}`}</span>
        {/* <span>GD Media admin  dashbord</span> */}
    </div>
  )
}

export default Footer