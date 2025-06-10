import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

export default function SkeletonComp(props) {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (props.count) {
      let arr = [];
      for (let i = 0; i < props.count; i++) {
        arr.push(i);
      }
      setArr(arr);
    }
  }, []);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Skeleton />

        {arr?.map((data) => {
          return (
            <span key={data}>
              <Skeleton animation="wave" />
            </span>
          );
        })}
      </Box>
    </>
  );
}
