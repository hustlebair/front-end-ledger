import { supabase } from '../integrations/supabase/client';

const ADMIN_EMAIL = 'ecombair@gmail.com';

export interface AuthUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

// Check if current user is authenticated and is admin
export async function checkAdminAuth(): Promise<AuthUser | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }

    const isAdmin = user.email === ADMIN_EMAIL;
    
    return {
      id: user.id,
      email: user.email || '',
      isAdmin
    };
  } catch (error) {
    console.error('Error checking admin auth:', error);
    return null;
  }
}

// Sign in with email and password
export async function signInAdmin(email: string, password: string): Promise<{ success: boolean; error?: string; user?: AuthUser }> {
  try {
    if (email !== ADMIN_EMAIL) {
      return { success: false, error: 'Access denied. Only authorized administrators can access this area.' };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email || '',
          isAdmin: data.user.email === ADMIN_EMAIL
        }
      };
    }

    return { success: false, error: 'Authentication failed' };
  } catch (error) {
    console.error('Error signing in admin:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Sign out
export async function signOutAdmin(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

// Listen for auth state changes
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const user = await checkAdminAuth();
      callback(user);
    } else {
      callback(null);
    }
  });
}
