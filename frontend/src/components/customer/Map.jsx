export default function Map() {
const mapStyles = {
    mapswrapper: {
        background: '#fff',
        position: 'relative',
    },
    iframe: {
        width: '100%',
        height: '300px',
        loading: 'lazy',
        allowFullScreen: true,
        border: 0,
        position: 'relative',
        zIndex: 2,
    },
    link: {
        color: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 0,
    },
};

return (
  <>
    <div id="map">
      <div style={mapStyles.mapswrapper}>
        <iframe
          title="Restaurant Location"
          src={
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.935404489088!2d106.66637047480549!3d10.816255389334906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529193d82cec5%3A0x9a2a4c20b4b9487f!2zQTM1IMSQLiBC4bqhY2ggxJDhurFuZywgUGjGsOG7nW5nIDIsIFTDom4gQsOsbmgsIEjhu5MgQ2jDrSBNaW5oIDczMDAwMCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1731600309066!5m2!1sen!2s"
          }
          style={mapStyles.iframe}
        ></iframe>
        <a href="#" style={mapStyles.link}></a>
      </div>
    </div>
  </>
);
}
