create table users(
	id serial not null primary key,
	username text,
	first_name text,
    surname text,
    email text,
	password text,
    profile_picture text
);
create table businesses(
	id serial not null primary key,
	business_name text,
	owner_id int,
    category text,
    logo text,
    foreign key (owner_id) references users(id)
);
create table loyalty_programmes(
	id serial not null primary key,
	business_id int,
	stamps text,
    reward text,
    valid_for text,
    foreign key (business_id) references businesses(id)
);
create table stamps(
	id serial not null primary key,
	customer_id int,
	lp_id int,
    timestamp text,
    redeemed text,
    foreign key (customer_id) references users(id),
    foreign key (lp_id) references loyalty_programmes(id)
);