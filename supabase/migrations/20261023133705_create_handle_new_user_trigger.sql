-- Tự tạo dòng public.profiles khi có user mới đăng ký qua Supabase Auth.
-- Theo đúng pattern chính thức của Supabase (supabase.com/docs/guides/auth/managing-user-data):
-- security definer + search_path rỗng để tránh SQL injection qua schema search path,
-- vì vậy mọi bảng tham chiếu trong function phải ghi đầy đủ "public.<table>".
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
