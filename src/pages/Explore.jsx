import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Explore() {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('public-devices/')
      .then(res => {
        setDevices(res.data);
        setFilteredDevices(res.data);
      })
      .catch(console.error);
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    const filtered = devices.filter(d =>
      d.title.toLowerCase().includes(keyword) || d.city.toLowerCase().includes(keyword)
    );
    setFilteredDevices(filtered);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">🎯 Explore Rentable Devices</h2>

      <Form.Control
        type="text"
        placeholder="Search by device title or city..."
        value={search}
        onChange={handleSearch}
        className="mb-4"
      />

      <Row>
        {filteredDevices.length > 0 ? (
          filteredDevices.map(dev => (
            <Col key={dev.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-4 shadow-sm">
                {dev.image && <Card.Img variant="top" src={dev.image} style={{ height: '180px', objectFit: 'cover' }} />}
                <Card.Body>
                  <Card.Title>{dev.title}</Card.Title>
                  <Card.Text>
                    {dev.city} • ₹{dev.price_per_day}/day
                  </Card.Text>
                  <Button variant="primary" size="sm" onClick={() => navigate(`/devices/${dev.id}`)}>View</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-muted">No devices match your search.</p>
        )}
      </Row>
    </Container>
  );
}

export default Explore;