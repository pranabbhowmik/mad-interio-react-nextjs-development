"use client";
import { useState } from "react";
import { Mail, Phone, User, Loader } from "react-feather";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Turnstile from "react-turnstile";

const LogInCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    subject: "",
    enquiryBy: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  const SITE_KEY = process.env.CLOUD_FLARE_SITE_KEY; // your Cloudflare site key

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.enquiryBy) newErrors.enquiryBy = "description is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    // if (!captchaToken) newErrors.captcha = "Please verify you are human";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        "cf-turnstile-response": captchaToken, // Cloudflare Turnstile token
      };

      const res = await fetch(`${SITE_URL}/Enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.status) {
        toast.success("Thank you! We’ll contact you shortly");
        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          subject: "",
          enquiryBy: "",
          message: "",
        });
        setCaptchaToken(null);
        setErrors({});
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to submit. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const dropdownStyle = {
    border: "0",
    borderBottom: "1px solid #eeeeee",
    color: "#9595b0",
    borderRadius: "0",
    fontFamily: "Rubik, sans-serif;",
    fontWeight: "400",
    backgroundColor: "transparent",
    boxShadow: "none",
  };

  const getInputClass = (error) => (error ? "is-invalid" : "");

  return (
    <div className="log-in theme-card">
      <div className="title-3 text-start">
        <h2>Let's Get In Touch</h2>
      </div>
      <Form onSubmit={onSubmit}>
        <Row className="gx-3">
          {/* Name */}
          <FormGroup className="form-group col-md-12">
            <Label for="nameInput" className="form-label mb-2">
              Name <span style={{ color: "red" }}>*</span>
            </Label>
            <InputGroup
              className={`has-validation ${getInputClass(errors.name)}`}
            >
              <InputGroupText>
                <User />
              </InputGroupText>
              <Input
                type="text"
                name="name"
                id="nameInput"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                aria-describedby="nameFeedback"
              />
            </InputGroup>
            <FormFeedback id="nameFeedback">{errors.name}</FormFeedback>
          </FormGroup>

          {/* Phone */}
          <FormGroup className="form-group col-md-6">
            <Label for="phoneNumberInput" className="form-label mb-2">
              Phone Number <span style={{ color: "red" }}>*</span>
            </Label>
            <InputGroup
              className={`has-validation ${getInputClass(errors.phoneNumber)}`}
            >
              <InputGroupText>
                <Phone />
              </InputGroupText>
              <Input
                type="tel"
                name="phoneNumber"
                id="phoneNumberInput"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                aria-describedby="phoneNumberFeedback"
              />
            </InputGroup>
            <FormFeedback id="phoneNumberFeedback">
              {errors.phoneNumber}
            </FormFeedback>
          </FormGroup>

          {/* Email */}
          <FormGroup className="form-group col-md-6">
            <Label for="emailInput" className="form-label mb-2">
              Email Address <span style={{ color: "red" }}>*</span>
            </Label>
            <InputGroup
              className={`has-validation ${getInputClass(errors.email)}`}
            >
              <InputGroupText>
                <Mail />
              </InputGroupText>
              <Input
                type="email"
                name="email"
                id="emailInput"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                aria-describedby="emailFeedback"
              />
            </InputGroup>
            <FormFeedback id="emailFeedback">{errors.email}</FormFeedback>
          </FormGroup>

          {/* Subject */}
          <FormGroup className="form-group col-md-6">
            <Label for="subjectInput" className="form-label mb-2">
              Subject <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="select"
              name="subject"
              id="subjectInput"
              style={dropdownStyle}
              value={formData.subject}
              onChange={handleChange}
              className={getInputClass(errors.subject)}
              aria-describedby="subjectFeedback"
            >
              <option value="">Select Subject </option>
              <option value="Listing Interest">Listing Interest</option>
              <option value="General Inquiry">General Inquiry</option>
            </Input>
            <FormFeedback id="subjectFeedback">{errors.subject}</FormFeedback>
          </FormGroup>

          {/* Enquiry By */}
          <FormGroup className="form-group col-md-6">
            <Label for="enquiryByInput" className="form-label mb-2">
              What describes you? <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="select"
              name="enquiryBy"
              id="enquiryByInput"
              style={dropdownStyle}
              value={formData.enquiryBy}
              onChange={handleChange}
              className={getInputClass(errors.enquiryBy)}
              aria-describedby="enquiryByFeedback"
            >
              <option value="">What describes you? </option>
              <option value="Real Estate Developer">
                Real Estate Developer
              </option>
              <option value="Interior Designer">Interior Designer</option>
              <option value="Investor">Investor</option>
            </Input>
            <FormFeedback id="enquiryByFeedback">
              {errors.enquiryBy}
            </FormFeedback>
          </FormGroup>

          {/* Message */}
          <FormGroup className="form-group col-md-12">
            <Label for="messageInput" className="form-label mb-2">
              Message <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="textarea"
              name="message"
              id="messageInput"
              rows="3"
              placeholder="Write here something "
              value={formData.message}
              onChange={handleChange}
              className={getInputClass(errors.message)}
              style={{
                border: "0",
                borderBottom: "1px solid #eeeeee",
                borderRadius: "0",
                color: "#9595b0",
                fontWeight: "400",
                fontFamily: "Rubik, sans-serif;",
              }}
              aria-describedby="messageFeedback"
            />
            <FormFeedback id="messageFeedback">{errors.message}</FormFeedback>
          </FormGroup>

          {/* Cloudflare Turnstile CAPTCHA */}
          <FormGroup className="form-group col-md-12 text-center">
            <Turnstile
              sitekey={SITE_KEY}
              onVerify={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
              theme="light"
            />
            {errors.captcha && (
              <div
                style={{ color: "red", fontSize: "0.875rem", marginTop: "5px" }}
              >
                {errors.captcha}
              </div>
            )}
          </FormGroup>

          {/* Submit */}
          <div className="submit-btn with-captcha">
            <Button
              className="btn btn-gradient btn-flat"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin me-2" size={16} />
                  Submitting...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default LogInCard;
