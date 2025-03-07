import React, { useReducer, useEffect } from "react";
import { Form, InputNumber, Button, Row, Col } from "antd";

export interface FilterState {
  minMarketCap: number;
  maxMarketCap: number;
}

export const initialFilterState: FilterState = {
  minMarketCap: 0,
  maxMarketCap: Number.MAX_SAFE_INTEGER,
};

type FilterAction =
  | { type: "SET_MIN"; payload: number }
  | { type: "SET_MAX"; payload: number }
  | { type: "RESET" };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_MIN":
      return { ...state, minMarketCap: action.payload };
    case "SET_MAX":
      return { ...state, maxMarketCap: action.payload };
    case "RESET":
      return initialFilterState;
    default:
      return state;
  }
}

interface CompanyFilterProps {
  onFilterChange: (state: FilterState) => void;
}

const CompanyFilter: React.FC<CompanyFilterProps> = ({ onFilterChange }) => {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);


  useEffect(() => {
    onFilterChange(state);
  }, [state, onFilterChange]);

  return (
    <div style={{ width: "100%", padding: "16px" }}>
      <Form layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label="Min Market Cap">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter minimum market cap"
                value={state.minMarketCap}
                onChange={(value) =>
                  dispatch({ type: "SET_MIN", payload: value ?? 0 })
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Max Market Cap">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter maximum market cap"
                value={
                  state.maxMarketCap === Number.MAX_SAFE_INTEGER
                    ? undefined
                    : state.maxMarketCap
                }
                onChange={(value) =>
                  dispatch({
                    type: "SET_MAX",
                    payload: value ?? Number.MAX_SAFE_INTEGER,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button
              type="default"
              onClick={() => dispatch({ type: "RESET" })}
              block
            >
              Reset Filter
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CompanyFilter;
