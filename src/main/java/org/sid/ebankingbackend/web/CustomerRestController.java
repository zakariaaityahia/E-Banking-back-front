package org.sid.ebankingbackend.web;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sid.ebankingbackend.dtos.CustomerDTO;
import org.sid.ebankingbackend.exceptions.CustomerNotFoundException;
import org.sid.ebankingbackend.services.BankAccountService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("customers/")
@CrossOrigin("*")
public class CustomerRestController {
    private BankAccountService bankAccountService;
    @GetMapping("index")
    @PreAuthorize("hasAnyAuthority('SCOPE_USER')")
    public List<CustomerDTO> customers(){
        return bankAccountService.listCustomers();
    }
    @GetMapping("search")
    @PreAuthorize("hasAnyAuthority('SCOPE_USER')")

    public List<CustomerDTO> searchCustomers(@RequestParam(name = "keyword",defaultValue = "") String keyword){
        return bankAccountService.searchCustomers("%"+keyword+"%");
    }
    @PreAuthorize("hasAnyAuthority('SCOPE_USER')")
    @GetMapping("get/{id}")
    public CustomerDTO get(@PathVariable(name = "id") Long customerId) throws CustomerNotFoundException {
        return bankAccountService.getCustomer(customerId);
    }
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    @PostMapping("save")
    public CustomerDTO save(@RequestBody CustomerDTO customerDTO){
        return bankAccountService.saveCustomer(customerDTO);
    }
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    @PutMapping("update")
    public CustomerDTO update(@RequestBody CustomerDTO customerDTO){
        return bankAccountService.updateCustomer(customerDTO);
    }
    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public void delete(@PathVariable Long id){
        bankAccountService.deleteCustomer(id);
    }
}
