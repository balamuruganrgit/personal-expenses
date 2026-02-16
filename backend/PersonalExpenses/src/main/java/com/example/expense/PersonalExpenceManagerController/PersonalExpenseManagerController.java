package com.example.expense.PersonalExpenceManagerController;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.expense.PersonalExpenceManagerService.PersonalExpenseManagerService;
import com.example.expense.personalexpencemanager.PersonalExpenseManager;



@RestController
@RequestMapping("/personal_expense")
@CrossOrigin("*")
public class PersonalExpenseManagerController {

    private final PersonalExpenseManagerService personal_expense;

    public PersonalExpenseManagerController(PersonalExpenseManagerService personal_expense) {
        this.personal_expense = personal_expense;
    }

    @GetMapping
    public List<PersonalExpenseManager> getData() {
        return personal_expense.getAllExpenses();
    }

    @GetMapping("/{id}")
    public PersonalExpenseManager getById(@PathVariable Long id) {
        return personal_expense.getExpenseById(id);
    }

    @PostMapping
    public PersonalExpenseManager setData(@RequestBody PersonalExpenseManager request) {
        return personal_expense.saveExpenses(request);
    }

    @PutMapping("/{id}")
    public PersonalExpenseManager changeData(@PathVariable Long id,
                                             @RequestBody PersonalExpenseManager bala) {
        return personal_expense.changeExpenses(id, bala);
    }

    @DeleteMapping("/{id}")
    public String deleteData(@PathVariable Long id) {
        personal_expense.deleteExpenses(id);
        return "Personal Expenses Deleted Successfully";
    }
}

