package com.example.expense.PersonalExpenceManagerService;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.expense.PersonalExpenceManagerRepository.PersonalExpenseManagerRepository;
import com.example.expense.personalexpencemanager.PersonalExpenseManager;



@Service
public class PersonalExpenseManagerService {

    private final PersonalExpenseManagerRepository expenses;

    public PersonalExpenseManagerService(PersonalExpenseManagerRepository expenses) {
        this.expenses = expenses;
    }

    // Get all expenses
    public List<PersonalExpenseManager> getAllExpenses() {
        return expenses.findAll();
    }

    // Get expense by id
    public PersonalExpenseManager getExpenseById(Long id) {
        return expenses.findById(id).orElse(null);
    }

    // Save expense
    public PersonalExpenseManager saveExpenses(PersonalExpenseManager expense) {
        return expenses.save(expense);
    }

    // Update expense
    public PersonalExpenseManager changeExpenses(Long id, PersonalExpenseManager created) {
        PersonalExpenseManager store = expenses.findById(id).orElse(null);

        if (store != null) {
            store.setPurpose(created.getPurpose());
            store.setSpent_amount(created.getSpent_amount());
            store.setMerchant_name(created.getMerchant_name());
            store.setDate(created.getDate());
            store.setPayment_method(created.getPayment_method());
            store.setLocation(created.getLocation());
            store.setDescription(created.getDescription());
            return expenses.save(store);
        }
        return null;
    }

    // Delete expense
    public void deleteExpenses(Long id) {
        expenses.deleteById(id);
    }
}
