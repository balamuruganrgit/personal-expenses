package com.example.expense.PersonalExpenceManagerRepository;




import org.springframework.data.jpa.repository.JpaRepository;

import com.example.expense.personalexpencemanager.PersonalExpenseManager;

public interface PersonalExpenseManagerRepository
        extends JpaRepository<PersonalExpenseManager, Long> {

	PersonalExpenseManager save(PersonalExpenseManager store);
	
}
