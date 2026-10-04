package com.campusloop.backend.controller;

import com.campusloop.backend.entity.Listing;
import com.campusloop.backend.repository.ListingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "*")
public class ListingController {

    private final ListingRepository listingRepository;

    public ListingController(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    @PostMapping
    public ResponseEntity<Listing> createListing(
            @RequestBody Listing listing) {

        Listing savedListing =
                listingRepository.save(listing);

        return ResponseEntity.ok(savedListing);
    }

    @GetMapping
    public ResponseEntity<List<Listing>> getAllListings() {

        return ResponseEntity.ok(
                listingRepository.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getListingById(
            @PathVariable Long id) {

        return listingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }
    @DeleteMapping("/{id}")
public ResponseEntity<?> deleteListing(
        @PathVariable Long id) {

    if (!listingRepository.existsById(id)) {
        return ResponseEntity.notFound().build();
    }

    listingRepository.deleteById(id);

    return ResponseEntity.ok().build();
}
}
