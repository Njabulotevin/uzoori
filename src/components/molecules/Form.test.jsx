import React, { useState } from "react"
import { render, renderHook, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Form";

describe("Form Components", () => {
  test("Render input field component", () => {
    render(
      <Input
        value=""
        placeholder="Email"
        onChange={()=>{}}
        name="email"
        type="email"
        isRequired={false}
        isError={false}
        onBlur={()=>{}}
        label="email"
      />
    );
    const input = screen.getByTestId("input-testId");
    expect(input).toBeInTheDocument
  });

  test("Change Input value", () => {
    const onChange = jest.fn();
    render(
      <Input
        value=""
        placeholder="Email"
        onChange={onChange}
        name="email"
        type="email"
        isRequired={false}
        isError={false}
        onBlur={()=>{}}
        label="email"
      />
    );
    const input = screen.getByTestId("input-testId");
    fireEvent.change(input)
    expect(onChange).toHaveBeenCalledWith('hello');
  
    
  });
});
