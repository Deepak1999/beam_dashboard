import no_data from "../assets/images/no record found.png";

export default function NoDataFound() {
  return (
    <>
      <div className="text-center no_data_css">
        <img
          src={no_data}
          alt="No Data Found"
          style={{
            width: "250px",
            height: "auto",
            marginTop: "10px",
            opacity: "0.5",
          }}
        />
      </div>
    </>
  );
}
