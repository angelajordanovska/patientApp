package com.example.patient.entities;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String city;
    private String address;
    private int postalCode;
    @Column(name = "patient_id")
    private Long patientId;

    public Location(Long id, String city, String address, int postalCode, Long patientId) {
        this.id = id;
        this.city = city;
        this.address = address;
        this.postalCode = postalCode;
        this.patientId = patientId;
    }

    public Location() {

    }

    public Long getPatientId() {
        return this.patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }


    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o)
            return true;
        if (!(o instanceof Location))
            return false;
        Location location = (Location) o;
        return Objects.equals(this.id, location.id) && Objects.equals(this.city, location.city)
                && Objects.equals(this.address, location.address)
                && Objects.equals(this.postalCode, location.postalCode)
                && Objects.equals(this.patientId, location.patientId);
    }

    @Override
    public String toString() {
        return "Location " + "id=" + this.id + ", city='" + this.city + " " + this.address;
    }
}
