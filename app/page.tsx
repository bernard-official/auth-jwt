"use client";
import Form from "@/components/form";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <main className="m-10 flex flex-col space-y-5 items-center justify-center">
      <Form />
    </main>
  );
}
